package com.main.volunteer.restdocs.controller.group.group;

import com.main.volunteer.domain.group.entity.Group;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface GroupControllerHelper extends ControllerHelper<Group> {
    String GROUP_URL = "/groups";
    String RESOURCE_URI = "/{group-id}";
    default String getUrl() {
        return GROUP_URL;
    }
    default String getURI() {
        return GROUP_URL + RESOURCE_URI;
    }
    default List<ParameterDescriptor> getGroupRequestPathParameterDescriptor() {
        return List.of(parameterWithName("group-id").description("그룹 식별자"));
    }

    default List<FieldDescriptor> getGroupPostRequestDescriptors() {
        return List.of(
                fieldWithPath("groupName").type(JsonFieldType.STRING).description("그룹 이름"),
                fieldWithPath("groupImage").type(JsonFieldType.STRING).description("그룹 프로필 이미지"),
                fieldWithPath("applyLimit").type(JsonFieldType.STRING).description("인원 제한"),
                fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
                fieldWithPath("tagName").type(JsonFieldType.STRING).description("태그 이름")
        );
    }
    default List<FieldDescriptor> getGroupPatchRequestDescriptors() {
        return List.of(
                fieldWithPath("groupId").type(JsonFieldType.NUMBER).description("그룹 식별자").ignored(),
                fieldWithPath("groupName").type(JsonFieldType.STRING).description("그룹 이름"),
                fieldWithPath("groupImage").type(JsonFieldType.STRING).description("그룹 프로필 이미지"),
                fieldWithPath("applyLimit").type(JsonFieldType.NUMBER).description("인원 제한"),
                fieldWithPath("place").type(JsonFieldType.STRING).description("장소"),
                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
            );
    }
    default List<FieldDescriptor> getGroupResponseDescriptors() {
        return List.of(
                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터"),
                fieldWithPath("data.groupId").type(JsonFieldType.NUMBER).description("그룹 식별자"),
                fieldWithPath("data.groupName").type(JsonFieldType.STRING).description("그룹 이름"),
                fieldWithPath("data.groupZangId").type(JsonFieldType.NUMBER).description("그룹장 아이디"),
                fieldWithPath("data.groupImage").type(JsonFieldType.STRING).description("그룹 프로필 이미지"),
                fieldWithPath("data.applyLimit").type(JsonFieldType.NUMBER).description("인원 제한"),
                fieldWithPath("data.place").type(JsonFieldType.STRING).description("장소"),
                fieldWithPath("data.content").type(JsonFieldType.STRING).description("내용"),
                fieldWithPath("data.tagId").type(JsonFieldType.NUMBER).description("태그 아이디"),
                fieldWithPath("data.tagName").type(JsonFieldType.STRING).description("태그 이름"),
                fieldWithPath("data.groupMember").type(JsonFieldType.STRING).description("가입 여부")
        );
    }
}
