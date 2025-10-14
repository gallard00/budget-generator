package com.nahuelgallardo.budgetgenerator.repository;

import com.nahuelgallardo.budgetgenerator.model.BudgetItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgeItemRepository extends JpaRepository<BudgetItem, Long> {
}
