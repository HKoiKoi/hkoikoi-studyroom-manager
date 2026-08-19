package com.hkoikoi.studyroomManager.domain.patrolLog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hkoikoi.studyroomManager.domain.patrolLog.entity.PatrolLog;

@Repository
public interface PatrolLogRepository extends JpaRepository<PatrolLog, Long> {
}
