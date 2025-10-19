package com.nahuelgallardo.budgetgenerator.exporter;

import com.nahuelgallardo.budgetgenerator.model.Budget;

import java.io.File;
import java.io.IOException;

public interface IFileExporter {
    File export(Budget budget) throws IOException;
}
