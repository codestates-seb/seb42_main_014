package com.main.volunteer;

import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.domain.tag.repository.TagRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class VolunteerApplication {

	public static void main(String[] args) {
		SpringApplication.run(VolunteerApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(TagRepository tagRepository) {
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				tagRepository.save(new Tag(1L,"어린이"));
				tagRepository.save(new Tag(2L, "여성"));
				tagRepository.save(new Tag(3L, "어르신"));
				tagRepository.save(new Tag(4L, "장애인"));
				tagRepository.save(new Tag(5L, "동물"));
				tagRepository.save(new Tag(6L, "환경"));
				tagRepository.save(new Tag(7L, "사회"));

			}
		};
	}


}
