import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor() { }

  public exportTable(title: string, headers: string[], data: string[][], filename: string) {
    const doc = new jsPDF();

    // -- HEADER --
    // Logo Placeholder (A stylized green box simulating the DVelop / HiCone logo)
    doc.setFillColor(92, 184, 92); // Angular success green (matches HiCone styling)
    doc.rect(14, 15, 40, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('HiCone', 18, 25);
    
    // Contact Info (Right aligned, Paris info like in QA)
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('DVelop Software Solutions', 140, 18);
    doc.text('Phone: +33 1 23 45 67 89', 140, 23);
    doc.text('Email: info@dvelop.com', 140, 28);
    doc.text('Address: 15 Rue de la Paix, Paris, France', 140, 33);

    // Separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 40, 196, 40);

    // Report Title
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 14, 50);
    
    // Sub-info (Date of generation)
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(`Generado el: ${new Date().toLocaleString()}`, 14, 56);

    // -- TABLE --
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 65,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 3,
        textColor: [50, 50, 50],
        font: 'helvetica'
      },
      headStyles: {
        fillColor: [92, 184, 92], // HiCone Green
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      didDrawPage: (data) => {
        // Footer pagination
        const str = `Página ${(doc as any).internal.getNumberOfPages()}`;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      }
    });

    // Save
    doc.save(filename);
  }
}
