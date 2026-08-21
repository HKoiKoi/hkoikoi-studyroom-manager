package com.hkoikoi.studyroomManager.domain.patrolLog.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hkoikoi.studyroomManager.domain.patrolLog.entity.PatrolLog;

@Repository
public interface PatrolLogRepository extends JpaRepository<PatrolLog, Long> {

	List<PatrolLog> findAllByCreatedAtBetweenOrderByCreatedAtDesc(
		LocalDateTime createdAtAfter,
		LocalDateTime createdAtBefore
	);

	Optional<PatrolLog> findFirstByCreatedAtBetweenOrderByCreatedAtDesc(
		LocalDateTime createdAtAfter,
		LocalDateTime createdAtBefore
	);
}
