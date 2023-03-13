package com.main.volunteer.domain.tag.service;

import com.main.volunteer.domain.tag.repository.TagRepository;
import com.main.volunteer.domain.tag.entity.Tag;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag getTag(String tagName) {
        Optional<Tag> optional = tagRepository.findByTagName(tagName);
        return optional.orElseThrow(() -> new RuntimeException("존재하는 태그가 없습니다."));
    }

    public Tag verifyExistTag(Long tagId) {
        Optional<Tag> optional = tagRepository.findById(tagId);
        return optional.orElseThrow(() -> new RuntimeException("존재하는 태그가 없습니다."));
    }
}
