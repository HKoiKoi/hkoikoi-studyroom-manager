package com.hkoikoi.studyroomManager.domain.patrolLog.dto;

import java.util.Collections;
import java.util.List;

public record PatrolLogCreateRequest(

	List<Integer> standingSeats,
	List<Integer> cafeZoneSeats,
	List<Integer> drowsySeats,
	List<Integer> absentSeats,
	String memo
) {

	public PatrolLogCreateRequest {

		if (standingSeats == null) {
			standingSeats = Collections.emptyList();
		}

		if (cafeZoneSeats == null) {
			cafeZoneSeats = Collections.emptyList();
		}

		if (drowsySeats == null) {
			drowsySeats = Collections.emptyList();
		}

		if (absentSeats == null) {
			absentSeats = Collections.emptyList();
		}
	}
}
