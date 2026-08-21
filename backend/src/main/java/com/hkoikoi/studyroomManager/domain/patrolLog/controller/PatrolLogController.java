package com.hkoikoi.studyroomManager.domain.patrolLog.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hkoikoi.studyroomManager.common.dto.ApiResponse;
import com.hkoikoi.studyroomManager.domain.patrolLog.dto.PatrolLogCreateRequest;
import com.hkoikoi.studyroomManager.domain.patrolLog.dto.PatrolLogResponse;
import com.hkoikoi.studyroomManager.domain.patrolLog.dto.PatrolLogSeatMoveRequest;
import com.hkoikoi.studyroomManager.domain.patrolLog.service.PatrolLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/patrol-logs")
public class PatrolLogController {

	private final PatrolLogService patrolLogService;

	@GetMapping
	public ApiResponse<List<PatrolLogResponse>> getPatrolLogs(
		@RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date
	) {

		LocalDate targetDate = (date != null) ? date : LocalDate.now();

		return ApiResponse.success(patrolLogService.getPatrolLogsByDate(targetDate));
	}

	@GetMapping("/{patrolLogId}")
	public ApiResponse<PatrolLogResponse> getPatrolLog(@PathVariable Long patrolLogId) {
		return ApiResponse.success(patrolLogService.getPatrolLog(patrolLogId));
	}

	@GetMapping("/recent")
	public ApiResponse<PatrolLogResponse> getRecentPatrolLog() {
		return ApiResponse.success(patrolLogService.getRecentPatrolLog());
	}

	@PostMapping
	public ApiResponse<Long> createPatrolLog(@RequestBody PatrolLogCreateRequest request) {
		return ApiResponse.success(patrolLogService.createPatrolLog(request));
	}

	@PatchMapping("/{patrolLogId}/move-absent-seat")
	public ApiResponse<Void> moveAbsentSeat(
		@PathVariable Long patrolLogId,
		@RequestBody PatrolLogSeatMoveRequest request
	) {

		patrolLogService.moveAbsentSeat(patrolLogId, request);

		return ApiResponse.success();
	}
}
