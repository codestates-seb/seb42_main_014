package com.main.volunteer.member.mapper;

import com.main.volunteer.member.dto.MemberDto;
import com.main.volunteer.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);

    @Mapping(source = "point.pointCount", target = "point")
    MemberDto.Response memberToMemberResponseDto(Member member);
}
