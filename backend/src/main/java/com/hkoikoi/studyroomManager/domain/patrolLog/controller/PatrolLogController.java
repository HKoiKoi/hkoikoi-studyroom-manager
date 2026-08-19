package com.hkoikoi.studyroomManager.domain.patrolLog.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hkoikoi.studyroomManager.common.dto.ApiResponse;
import com.hkoikoi.studyroomManager.domain.patrolLog.dto.PatrolLogCreateRequest;
import com.hkoikoi.studyroomManager.domain.patrolLog.service.PatrolLogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/patrol-logs")
public class PatrolLogController {

	private final PatrolLogService patrolLogService;

	@PostMapping
	public ApiResponse<Long> createPatrolLog(@RequestBody PatrolLogCreateRequest request) {
		return ApiResponse.success(patrolLogService.createPatrolLog(request));
	}
}
