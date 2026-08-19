package com.hkoikoi.studyroomManager.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.info(new Info()
				.title("HKoiKoi's Studyroom Manager API")
				.description("스터디룸 관리 시스템 백엔드 API 명세서")
				.version("v1.0.0")
			);
	}
}
