package com.nahuelgallardo.budgetgenerator.repository;

import com.nahuelgallardo.budgetgenerator.model.BudgetHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgeHistoryRepository extends JpaRepository<BudgetHistory, Long> {
}
