
import csv
with open(r'C:\Users\Ronny\.gemini\antigravity\brain\5e5cc854-146e-4147-998b-c5376c47bb7b\permissions_migration_p30_50.csv', 'r') as f:
    reader = list(csv.DictReader(f))
    for row in reader[730:]:
        print(f'            new() {{ Module = "HICONE", Name = "{row["Name"]}", Code = "{row["Code"]}" }},')
