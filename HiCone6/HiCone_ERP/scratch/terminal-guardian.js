const { spawn } = require('child_process');
const path = require('path');

class TerminalGuardian {
  constructor(initialCwd = process.cwd()) {
    this.allowedCommands = ['npm', 'npx', 'git', 'ls', 'mkdir', 'touch', 'cd', 'pwd', 'dotnet', 'node'];
    this.forbiddenPatterns = /\b(rm|uninstall|drop|git\s+clean|rd|del)\b|--force|>\s*\/|>>|(\x26\x26|;|\||`|\$)\s*(rm|uninstall|drop|rd|del)/i;
    this.cwd = initialCwd;
  }

  sanitizeCommand(cmd) {
    return cmd.trim().replace(/\s+/g, ' ');
  }

  validate(command) {
    const sanitized = this.sanitizeCommand(command);
    const segments = sanitized.split(/&&|;|\|/).map(s => s.trim());

    for (const segment of segments) {
      const baseCommand = segment.split(' ')[0];
      if (!this.allowedCommands.includes(baseCommand)) {
        throw new Error(`[SecurityPolicyViolation]: Comando '${baseCommand}' no está en la whitelist.`);
      }
      if (this.forbiddenPatterns.test(segment)) {
        throw new Error(`[SecurityPolicyViolation]: Intento de operación destructiva detectado en: "${segment}"`);
      }
    }
    return true;
  }

  prepare(command) {
    if (command.includes('npm install') || command.includes('npm i ')) {
      let prepared = command;
      if (!prepared.includes('-y') && !prepared.includes('--yes')) {
        prepared += ' -y';
      }
      if (!prepared.includes('--no-audit')) {
        prepared += ' --no-audit';
      }
      return prepared;
    }
    return command;
  }

  async runSafe(command) {
    try {
      this.validate(command);
      const preparedCmd = this.prepare(command);

      if (preparedCmd.startsWith('cd ')) {
        const targetDir = preparedCmd.split(' ')[1];
        const newPath = path.resolve(this.cwd, targetDir);
        this.cwd = newPath;
        return { stdout: `Directorio cambiado a ${this.cwd}`, code: 0 };
      }

      return new Promise((resolve, reject) => {
        const [cmd, ...args] = preparedCmd.split(' ');
        // Usamos shell: true para Windows y para soportar los argumentos correctamente
        const child = spawn(cmd, args, { 
          cwd: this.cwd, 
          shell: true
        });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        child.on('close', (code) => {
          if (code === 0) {
            resolve({ stdout, stderr, code });
          } else {
            reject(new Error(`Comando falló con código ${code}\nStderr: ${stderr}`));
          }
        });

        child.on('error', (err) => reject(err));
      });

    } catch (error) {
      throw error;
    }
  }
}

module.exports = { TerminalGuardian };
