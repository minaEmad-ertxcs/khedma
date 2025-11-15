package com.mina.khedma.mapper;

import com.mina.khedma.DAO.AttendanceDAO;
import com.mina.khedma.model.AttendanceDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AttendanceMapper {
    public AttendanceDTO toDto(AttendanceDAO attendance) {
        if (attendance == null) return null;

        AttendanceDTO dto = new AttendanceDTO();
        dto.setDate(attendance.getDate());
        dto.setIsPresent(Boolean.TRUE);
        return dto;
    }

    public List<AttendanceDTO> toDto(List<AttendanceDAO> attendances) {
        if (attendances == null) return null;
        List<AttendanceDTO> dtos = new ArrayList<>();

        for (AttendanceDAO attendance : attendances) {
            AttendanceDTO dto = toDto(attendance);
            dtos.add(dto);
        }

        return dtos;
    }
}
