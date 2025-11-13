package com.mina.khedma.DAO;

import com.mina.khedma.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "users")
public class UserDAO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;

    @ToString.Exclude
    private String password;

    private String mobileNumber;

    private LocalDate birthDate;

    private String grade;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<TokenDAO> tokens;

}