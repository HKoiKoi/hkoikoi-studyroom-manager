package com.hkoikoi.studyroomManager.domain.patrolLog.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.hkoikoi.studyroomManager.domain.patrolLog.entity.PatrolLog;

public record PatrolLogResponse(

	Long patrolLogId,
	List<Integer> standingSeats,
	List<Integer> cafeZoneSeats,
	List<Integer> drowsySeats,
	List<Integer> absentSeats,
	String memo,
	LocalDateTime createdAt
) {

	public static PatrolLogResponse from(PatrolLog patrolLog) {
		return new PatrolLogResponse(
			patrolLog.getId(),
			patrolLog.getStandingSeats(),
			patrolLog.getCafeZoneSeats(),
			patrolLog.getDrowsySeats(),
			patrolLog.getAbsentSeats(),
			patrolLog.getMemo(),
			patrolLog.getCreatedAt()
		);
	}
}
