package com.hkoikoi.studyroomManager.common.exception;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hkoikoi.studyroomManager.common.dto.ApiResponse;
import com.hkoikoi.studyroomManager.common.dto.ErrorResponse;
import com.hkoikoi.studyroomManager.common.dto.FieldErrorDetail;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

	/**
	 * 커스텀 비즈니스 룰 위반했을 때 발생하는 예외 처리
	 */
	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<ApiResponse<Void>> handleBusinessException(BusinessException e) {

		log.warn("[BusinessException] code: {}, message: {}", e.getErrorCodeString(), e.getMessage());

		return makeErrorResponseEntity(e.getErrorCode());
	}

	/**
	 * @RequestBody로 들어온 JSON 데이터의 @Valid 검증이 실패했을 때 발생하는 예외 처리
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiResponse<Void>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

		log.warn("[ValidationException] message: {}", e.getMessage());

		List<FieldErrorDetail> details = e.getBindingResult().getFieldErrors().stream()
			.map(error -> new FieldErrorDetail(error.getField(), error.getDefaultMessage()))
			.toList();

		return makeErrorResponseEntity(ErrorCode.INVALID_INPUT_VALUE, details);
	}

	/**
	 * @PathVariable, @RequestParam 등 단일 파라미터의 검증이 실패했을 때 발생하는 예외 처리
	 */
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ApiResponse<Void>> handleConstraintViolationException(ConstraintViolationException e) {

		log.warn("[ConstraintViolationException] message: {}", e.getMessage());

		List<FieldErrorDetail> details = e.getConstraintViolations().stream()
			.map(violation -> {
				String path = violation.getPropertyPath().toString();
				String field = path.contains(".") ? path.substring(path.lastIndexOf('.') + 1) : path;
				return new FieldErrorDetail(field, violation.getMessage());
			})
			.toList();

		return makeErrorResponseEntity(ErrorCode.INVALID_INPUT_VALUE, details);
	}

	/**
	 * 컨트롤러에 정의된 필수 파라미터가 요청에서 누락되었을 때 발생하는 예외 처리
	 */
	@ExceptionHandler(MissingServletRequestParameterException.class)
	public ResponseEntity<ApiResponse<Void>> handleMissingServletRequestParameterException(
		MissingServletRequestParameterException e
	) {

		log.warn("[MissingServletRequestParameterException] parameter: {}, message: {}",
			e.getParameterName(), e.getMessage()
		);

		return makeErrorResponseEntity(ErrorCode.INVALID_INPUT_VALUE);
	}

	/**
	 * 요청 Body가 비어있거나, JSON 형식이 잘못되어 파싱할 수 없을 때 발생하는 예외 처리
	 */
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ApiResponse<Void>> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {

		log.warn("[HttpMessageNotReadableException] message: {}", e.getMessage());

		return makeErrorResponseEntity(ErrorCode.INVALID_INPUT_VALUE);
	}

	/**
	 * 지원하지 않는 HTTP 메서드로 호출했을 때 발생하는 예외 처리
	 */
	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	public ResponseEntity<ApiResponse<Void>> handleHttpRequestMethodNotSupportedException(
		HttpRequestMethodNotSupportedException e
	) {

		log.warn("[HttpRequestMethodNotSupportedException] method: {}, message: {}", e.getMethod(), e.getMessage());

		return makeErrorResponseEntity(ErrorCode.METHOD_NOT_ALLOWED);
	}

	/**
	 * 정의하지 않은 서버 내부의 모든 에러를 최종적으로 캐치하는 예외 처리
	 */
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse<Void>> handleException(Exception e) {

		log.error("[UnHandledException] ", e);

		return makeErrorResponseEntity(ErrorCode.INTERNAL_SERVER_ERROR);
	}

	private ResponseEntity<ApiResponse<Void>> makeErrorResponseEntity(ErrorCode errorCode) {

		ErrorResponse errorResponse = ErrorResponse.of(errorCode.getCode(), errorCode.getMessage());

		return ResponseEntity
			.status(errorCode.getStatus())
			.body(ApiResponse.fail(errorResponse));
	}

	private ResponseEntity<ApiResponse<Void>> makeErrorResponseEntity(
		ErrorCode errorCode,
		List<FieldErrorDetail> details
	) {

		ErrorResponse errorResponse = ErrorResponse.of(errorCode.getCode(), errorCode.getMessage(), details);

		return ResponseEntity
			.status(errorCode.getStatus())
			.body(ApiResponse.fail(errorResponse));
	}
}
