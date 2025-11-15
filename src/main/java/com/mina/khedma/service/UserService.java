package com.mina.khedma.service;

import com.mina.khedma.DAO.AttendanceDAO;
import com.mina.khedma.DAO.UserDAO;
import com.mina.khedma.mapper.AttendanceMapper;
import com.mina.khedma.mapper.UserMapper;
import com.mina.khedma.model.AttendanceDTO;
import com.mina.khedma.model.DateDTO;
import com.mina.khedma.model.UserAttendanceDTO;
import com.mina.khedma.model.UserDTO;
import com.mina.khedma.repo.AttendanceRepo;
import com.mina.khedma.repo.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static com.mina.khedma.utilities.PageListUtils.toPage;

@Service
public class UserService {

    private final UserRepo userRepo;
    private final AttendanceRepo attendanceRepo;
    private final UserMapper userMapper;
    private final AttendanceMapper attendanceMapper;

    public UserService(UserMapper userMapper, UserRepo userRepo, AttendanceRepo attendanceRepo, AttendanceMapper attendanceMapper) {
        this.userMapper = userMapper;
        this.userRepo = userRepo;
        this.attendanceRepo = attendanceRepo;
        this.attendanceMapper = attendanceMapper;
    }

    public Page<UserDTO> getAllUsers(Pageable pageable) {
        Page<UserDAO> usersPage = userRepo.findAll(pageable);
        return usersPage.map(userMapper::toDto);
    }

    public Page<UserAttendanceDTO> getAllAttendances(Pageable pageable, DateDTO dateDTO) {
        List<LocalDate> days = getFridays(dateDTO.getYear(), dateDTO.getMonth(), DayOfWeek.FRIDAY);

        Page<UserDAO> usersPage = userRepo.findAll(pageable);
        List<UserAttendanceDTO> userAttendanceList = new LinkedList<>();

        for (UserDAO user : usersPage.getContent()) {
            UserAttendanceDTO userAttendance = new UserAttendanceDTO();
            userAttendance.setId(user.getId());
            userAttendance.setUsername(user.getUsername());

            List<AttendanceDAO> attendances = attendanceRepo.getAttendanceDAOByUser_Username(user.getUsername());

            List<AttendanceDTO> filteredAttendances = filterByDays(attendanceMapper.toDto(attendances), days);

            userAttendance.setAttendance(addNotPresentDates(filteredAttendances, days));

            userAttendanceList.add(userAttendance);
        }

        return toPage(userAttendanceList, pageable);
    }

    private List<AttendanceDTO> addNotPresentDates(List<AttendanceDTO> attendanceList, List<LocalDate> days) {
        List<LocalDate> extractedAttendances = extractDates(attendanceList);
        List<AttendanceDTO> newAttendanceList = new LinkedList<>();

        for (LocalDate date : days) {
            if (!extractedAttendances.contains(date)) {
                newAttendanceList.add(new AttendanceDTO(date, Boolean.FALSE));
            } else {
                newAttendanceList.add(new AttendanceDTO(date, Boolean.TRUE));
            }
        }

        return newAttendanceList;
    }

    private List<LocalDate> extractDates(List<AttendanceDTO> attendanceList) {
        return attendanceList.stream().map(AttendanceDTO::getDate).toList();
    }

    private List<AttendanceDTO> filterByDays(List<AttendanceDTO> attendances, List<LocalDate> days) {
        List<AttendanceDTO> newAttendance = new LinkedList<>();
        for (AttendanceDTO attendance : attendances) {
            if (days.contains(attendance.getDate())) {
                newAttendance.add(attendance);
            }
        }
        return newAttendance;
    }

    public List<LocalDate> getFridays(String year, String month, DayOfWeek dayOfWeek) {
        YearMonth yearMonth = YearMonth.of(Integer.parseInt(year), Integer.parseInt(month));
        List<LocalDate> days = new ArrayList<>();

        LocalDate date = yearMonth.atDay(1);
        LocalDate end = yearMonth.atEndOfMonth();

        while (!date.isAfter(end)) {
            if (date.getDayOfWeek() == dayOfWeek) {
                days.add(date);
            }
            date = date.plusDays(1);
        }

        return days;
    }
}