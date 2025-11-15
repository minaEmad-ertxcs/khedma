package com.mina.khedma.mapper;

import com.mina.khedma.DAO.UserDAO;
import com.mina.khedma.model.UserDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class UserMapper {
    public UserDTO toDto(UserDAO user) {
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole().name().toLowerCase(Locale.ROOT));
        dto.setMobileNumber(user.getMobileNumber());
        dto.setBrithDate(user.getBirthDate().toString());
        dto.setGrade(user.getGrade());
        return dto;
    }

    public List<UserDTO> toDtoList(List<UserDAO> users) {
        return users.stream().map(this::toDto).collect(Collectors.toList());
    }
}