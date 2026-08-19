package com.hkoikoi.studyroomManager.common.converter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.util.StringUtils;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class IntegerListConverter implements AttributeConverter<List<Integer>, String> {

	private static final String SPLIT_CHAR = ",";

	@Override
	public String convertToDatabaseColumn(List<Integer> attribute) {

		if (attribute == null || attribute.isEmpty()) {
			return "";
		}

		return attribute.stream()
			.map(String::valueOf)
			.collect(Collectors.joining(SPLIT_CHAR));
	}

	@Override
	public List<Integer> convertToEntityAttribute(String dbData) {

		if (!StringUtils.hasText(dbData)) {
			return Collections.emptyList();
		}

		return Arrays.stream(dbData.split(SPLIT_CHAR))
			.map(String::trim)
			.map(Integer::valueOf)
			.toList();
	}
}
