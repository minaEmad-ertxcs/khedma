package com.mina.khedma.service;

import com.mina.khedma.DAO.AttendanceDAO;
import com.mina.khedma.DAO.UserDAO;
import com.mina.khedma.mapper.AttendanceMapper;
import com.mina.khedma.model.AttendanceDTO;
import com.mina.khedma.model.DateDTO;
import com.mina.khedma.model.UserAttendanceDTO;
import com.mina.khedma.model.requests.DateRangeRequest;
import com.mina.khedma.repo.AttendanceRepo;
import com.mina.khedma.repo.UserRepo;
import org.apache.coyote.BadRequestException;
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
public class AttendanceService {

    private final UserRepo userRepo;
    private final AttendanceRepo attendanceRepo;
    private final AttendanceMapper attendanceMapper;

    public AttendanceService(UserRepo userRepo, AttendanceRepo attendanceRepo, AttendanceMapper attendanceMapper) {
        this.userRepo = userRepo;
        this.attendanceRepo = attendanceRepo;
        this.attendanceMapper = attendanceMapper;
    }

    public Page<UserAttendanceDTO> getAllAttendancesByRange(Pageable pageable, DateRangeRequest request) throws BadRequestException {
        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new BadRequestException("Start date and end date must not be null");
        }

        assert request.getStartDate() != null;
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new BadRequestException("Start date must not be after end date");
        }

        List<LocalDate> days = getDatesByRange(request.getStartDate(), request.getEndDate(), DayOfWeek.FRIDAY);
        return getUserAttendances(pageable, days);
    }

    public Page<UserAttendanceDTO> getAllAttendancesByYearMonth(Pageable pageable, DateDTO dateDTO) throws BadRequestException {
        if (dateDTO.getYear() == null)
            throw new BadRequestException("Year must not be null");

        String year = dateDTO.getYear();
        String month = dateDTO.getMonth();

        int yearInt = Integer.parseInt(year);

        LocalDate start;
        LocalDate end;

        if (month == null || month.isBlank()) {
            start = LocalDate.of(yearInt, 1, 1);
            end = LocalDate.now();
        } else {
            int monthInt = Integer.parseInt(month);

            YearMonth yearMonth = YearMonth.of(yearInt, monthInt);

            start = yearMonth.atDay(1);
            end = yearMonth.atEndOfMonth();
        }


        List<LocalDate> days = getDatesByRange(start, end, DayOfWeek.FRIDAY);

        return getUserAttendances(pageable, days);
    }

    private Page<UserAttendanceDTO> getUserAttendances(Pageable pageable, List<LocalDate> days) {
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

    public List<LocalDate> getDatesByRange(LocalDate start, LocalDate end, DayOfWeek dayOfWeek) {
        List<LocalDate> days = new ArrayList<>();

        while (!start.isAfter(end)) {
            if (start.getDayOfWeek() == dayOfWeek) {
                days.add(start);
            }
            start = start.plusDays(1);
        }

        return days;
    }

//    public List<LocalDate> getDatesByDay(String year, String month, DayOfWeek dayOfWeek) {
//        YearMonth yearMonth = YearMonth.of(Integer.parseInt(year), Integer.parseInt(month));
//        List<LocalDate> days = new ArrayList<>();
//
//        LocalDate date = yearMonth.atDay(1);
//        LocalDate end = yearMonth.atEndOfMonth();
//
//        while (!date.isAfter(end)) {
//            if (date.getDayOfWeek() == dayOfWeek) {
//                days.add(date);
//            }
//            date = date.plusDays(1);
//        }
//
//        return days;
//    }
}
