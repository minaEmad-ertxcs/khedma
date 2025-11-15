package com.mina.khedma.repo;

import com.mina.khedma.DAO.AttendanceDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepo extends JpaRepository<AttendanceDAO, Long> {
    List<AttendanceDAO> getAttendanceDAOByUser_Username(String userUsername);
}
