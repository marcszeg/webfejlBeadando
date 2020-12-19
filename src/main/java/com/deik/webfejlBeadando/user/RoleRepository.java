package com.deik.webfejlBeadando.user;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Qualifier("datasource1")
@Repository
public interface RoleRepository extends CrudRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
