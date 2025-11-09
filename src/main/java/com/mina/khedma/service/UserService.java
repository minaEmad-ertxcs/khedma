package com.mina.khedma.service;

import com.mina.khedma.DAO.UserDAO;
import com.mina.khedma.mapper.UserMapper;
import com.mina.khedma.model.UserDTO;
import com.mina.khedma.repo.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final UserRepo userRepo;

    public UserService(UserMapper userMapper, UserRepo userRepo) {
        this.userMapper = userMapper;
        this.userRepo = userRepo;
    }

    public Page<UserDTO> getAllUsers(Pageable pageable) {
        Page<UserDAO> usersPage = userRepo.findAll(pageable);

        return usersPage.map(userMapper::toDto);
    }
}