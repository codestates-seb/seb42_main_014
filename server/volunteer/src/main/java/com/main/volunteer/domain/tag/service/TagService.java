package com.main.volunteer.domain.tag.service;

import com.main.volunteer.domain.tag.repository.TagRepository;
import com.main.volunteer.domain.tag.entity.Tag;
import com.main.volunteer.exception.BusinessException;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag getTagName(String tagName) {
        Optional<Tag> optional = tagRepository.findByTagName(tagName);
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.TAG_NOT_EXIST));
    }

    public Tag verifyExistTag(Long tagId) {
        Optional<Tag> optional = tagRepository.findById(tagId);
        return optional.orElseThrow(() -> new BusinessException(ExceptionCode.TAG_NOT_EXIST));
    }
}
