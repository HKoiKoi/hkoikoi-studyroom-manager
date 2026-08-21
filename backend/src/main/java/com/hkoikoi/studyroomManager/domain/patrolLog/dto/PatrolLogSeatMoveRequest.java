package com.hkoikoi.studyroomManager.domain.patrolLog.dto;

import com.hkoikoi.studyroomManager.domain.patrolLog.enums.ZoneType;

public record PatrolLogSeatMoveRequest(

	Integer seatNumber,
	ZoneType targetZone
) {
}
