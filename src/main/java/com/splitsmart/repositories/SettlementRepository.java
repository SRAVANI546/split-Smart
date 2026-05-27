package com.splitsmart.repositories;

import com.splitsmart.models.Settlement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettlementRepository extends JpaRepository<Settlement, Long> {
    List<Settlement> findByExpenseId(Long expenseId);
    List<Settlement> findByPayerId(Long payerId);
    List<Settlement> findByRecipientId(Long recipientId);
}
