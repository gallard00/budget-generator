package com.nahuelgallardo.budgetgenerator.exporter;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.nahuelgallardo.budgetgenerator.model.Budget;
import com.nahuelgallardo.budgetgenerator.model.BudgetItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Slf4j
@Component
public class PdfExporter implements IFileExporter{
    @Override
    public File export(Budget budget) throws IOException {
        String fileName = "budget_" + budget.getId() + ".pdf";
        File file = new File("exports/" + fileName);

        // Crear carpeta exports si no existe
        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }

        try (FileOutputStream fos = new FileOutputStream(file)) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, fos);
            document.open();

            // Título
            Paragraph title = new Paragraph("Budget #" + budget.getId(),
                    new Font(Font.HELVETICA, 18, Font.BOLD));
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Client: " + budget.getClient().getName()));
            document.add(new Paragraph("Date: " + budget.getDate()));
            document.add(new Paragraph(" "));

            // Tabla de ítems
            PdfPTable table = new PdfPTable(4);
            table.addCell("Description");
            table.addCell("Quantity");
            table.addCell("Unit Price");
            table.addCell("Subtotal");

            for (BudgetItem item : budget.getItems()) {
                table.addCell(item.getDescription());
                table.addCell(String.valueOf(item.getQuantity()));
                table.addCell(String.format("$ %.2f", item.getUnitPrice()));
                double subtotal = item.getQuantity() * item.getUnitPrice();
                table.addCell(String.format("$ %.2f", subtotal));
            }

            document.add(table);
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Total: $" + String.format("%.2f", budget.getTotal())));
            document.close();
        }

        log.info("PDF generated: {}", file.getAbsolutePath());
        return file;
    }
}
