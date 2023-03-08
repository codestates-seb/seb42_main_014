package com.main.volunteer.singlePayment.repository;

import com.main.volunteer.singlePayment.entity.SinglePayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SinglePaymentRepository extends JpaRepository<SinglePayment, Long> {
}
