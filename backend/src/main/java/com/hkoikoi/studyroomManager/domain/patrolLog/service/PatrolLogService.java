package com.hkoikoi.studyroomManager.domain.patrolLog.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hkoikoi.studyroomManager.domain.patrolLog.dto.PatrolLogCreateRequest;
import com.hkoikoi.studyroomManager.domain.patrolLog.dto.PatrolLogResponse;
import com.hkoikoi.studyroomManager.domain.patrolLog.entity.PatrolLog;
import com.hkoikoi.studyroomManager.domain.patrolLog.repository.PatrolLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PatrolLogService {

	private final PatrolLogRepository patrolLogRepository;

	public List<PatrolLogResponse> getPatrolLogsByDate(LocalDate targetDate) {

		LocalDateTime startOfDay = targetDate.atStartOfDay();
		LocalDateTime endOfDay = targetDate.atTime(LocalTime.MAX);

		List<PatrolLog> patrolLogs = patrolLogRepository
			.findAllByCreatedAtBetweenOrderByCreatedAtDesc(startOfDay, endOfDay);

		return patrolLogs.stream()
			.map(PatrolLogResponse::from)
			.toList();
	}

	@Transactional
	public Long createPatrolLog(PatrolLogCreateRequest request) {

		PatrolLog patrolLog = PatrolLog.create(
			request.standingSeats(),
			request.cafeZoneSeats(),
			request.drowsySeats(),
			request.absentSeats(),
			request.memo()
		);

		PatrolLog savedPatrolLog = patrolLogRepository.save(patrolLog);

		return savedPatrolLog.getId();
	}
}
