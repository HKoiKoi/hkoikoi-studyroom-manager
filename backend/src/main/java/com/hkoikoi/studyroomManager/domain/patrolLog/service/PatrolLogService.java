package com.hkoikoi.studyroomManager.domain.patrolLog.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hkoikoi.studyroomManager.domain.patrolLog.dto.PatrolLogCreateRequest;
import com.hkoikoi.studyroomManager.domain.patrolLog.entity.PatrolLog;
import com.hkoikoi.studyroomManager.domain.patrolLog.repository.PatrolLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PatrolLogService {

	private final PatrolLogRepository patrolLogRepository;

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
