package com.hkoikoi.studyroomManager.domain.patrolLog.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.hkoikoi.studyroomManager.common.converter.IntegerListConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Getter
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "patrol_log")
public class PatrolLog {

	@Id
	@Column(name = "patrol_log_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;

	@Column(name = "standing_seats")
	@Convert(converter = IntegerListConverter.class)
	List<Integer> standingSeats = new ArrayList<>();

	@Column(name = "cafe_zone_seats")
	@Convert(converter = IntegerListConverter.class)
	List<Integer> cafeZoneSeats = new ArrayList<>();

	@Column(name = "drowsy_seats")
	@Convert(converter = IntegerListConverter.class)
	List<Integer> drowsySeats = new ArrayList<>();

	@Column(name = "absent_seats")
	@Convert(converter = IntegerListConverter.class)
	List<Integer> absentSeats = new ArrayList<>();

	@Column(columnDefinition = "TEXT")
	String memo;

	@CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	LocalDateTime createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	LocalDateTime updatedAt;

	public static PatrolLog create(
		List<Integer> standingSeats,
		List<Integer> cafeZoneSeats,
		List<Integer> drowsySeats,
		List<Integer> absentSeats,
		String memo
	) {

		PatrolLog patrolLog = new PatrolLog();

		patrolLog.standingSeats = standingSeats != null ? standingSeats : new ArrayList<>();
		patrolLog.cafeZoneSeats = cafeZoneSeats != null ? cafeZoneSeats : new ArrayList<>();
		patrolLog.drowsySeats = drowsySeats != null ? drowsySeats : new ArrayList<>();
		patrolLog.absentSeats = absentSeats != null ? absentSeats : new ArrayList<>();
		patrolLog.memo = memo;

		return patrolLog;
	}
}
