package com.hkoikoi.studyroomManager.common.dto;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public record ErrorResponse(

	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
	OffsetDateTime timestamp,

	String code,

	String message,

	List<FieldErrorDetail> details
) {

	public static ErrorResponse of(String code, String message) {
		return new ErrorResponse(
			OffsetDateTime.now(ZoneOffset.UTC),
			code,
			message,
			null
		);
	}

	public static ErrorResponse of(String code, String message, List<FieldErrorDetail> details) {
		return new ErrorResponse(
			OffsetDateTime.now(ZoneOffset.UTC),
			code,
			message,
			details
		);
	}
}
