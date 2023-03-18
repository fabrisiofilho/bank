package br.com.hiven.bank.service.impl;

import br.com.hiven.bank.configuration.PatternsDateTime;
import br.com.hiven.bank.entity.AccountEntity;
import br.com.hiven.bank.entity.TransactionEntity;
import br.com.hiven.bank.exception.BuninessException;
import br.com.hiven.bank.service.ReportService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

@Service
public class ReportServiceImpl implements ReportService {

    @Override
    public ByteArrayInputStream createPDF(AccountEntity contas) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            Paragraph preface = new Paragraph();
            preface.add(new Paragraph("Cadastro de Conta: " + contas.getNumber() , headFont));
            preface.add(new Paragraph("Titular: " + contas.getOwner().getName() , headFont));
            preface.add(new Paragraph("CPF do Titular: " + contas.getOwner().getCpf() , headFont));
            preface.add(new Paragraph("Saldo: " + contas.getBalance() , headFont));
            preface.add(new Paragraph(" "));


            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2, 4, 4});

            PdfPCell hcell;
            hcell = new PdfPCell(new Phrase("Tipo", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Valor", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Data", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            for (TransactionEntity entity : contas.getTransactions()) {

                PdfPCell cell;

                cell = new PdfPCell(new Phrase(entity.getType().toString()));
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase("R$ " + entity.getMount()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(cell);

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PatternsDateTime.ISO);

                cell = new PdfPCell(new Phrase(entity.getData().format(formatter)));
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setPaddingRight(5);
                table.addCell(cell);
            }

            PdfWriter.getInstance(document, out);
            document.open();
            document.add(preface);
            document.add(table);

            document.close();

        } catch (DocumentException ex) {
            throw new BuninessException("Erro ao gerar o relatorio");
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

}
