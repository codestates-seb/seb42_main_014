package com.main.volunteer.restdocs.controller.group.group;

import com.main.volunteer.domain.group.dto.GroupDto;
import com.main.volunteer.domain.group.entity.Group;
import com.main.volunteer.domain.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Stub {
    private static Map<HttpMethod, Object> stubRequestBody;

    static {
        stubRequestBody = new HashMap<>();

        stubRequestBody.put(HttpMethod.POST, new GroupDto.Post("좀나세","example.png",10,"서울","그룹생성 테스트 입니다","어린이"));
        stubRequestBody.put(HttpMethod.PATCH, new GroupDto.Patch(1L, "좀나세", "example.png",10,"서울","그룹수정 테스트 입니다"));
    }

    public static class MockGroup {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }
        public static GroupDto.Response getSingleResponseBody() {
             return new GroupDto.Response(
                     1L,
                     "좀나세",
                     "example.png",
                     1L,
                     10,
                     "서울",
                     "그룹생성 테스트 입니다",
                     1,
                     "어린이",
                     true);
        }

        public static List<GroupDto.Response> getMultiResponseBody() {
            return List.of(
                    new GroupDto.Response(
                            1L,
                            "좀나세",
                            "example.png",
                            1L,
                            10,
                            "서울",
                            "그룹생성 테스트 입니다",
                            1,
                            "어린이",
                            true),
                    new GroupDto.Response(
                            2L,
                            "더좀나세",
                            "example.png",
                            1L,
                            5,
                            "경기도",
                            "그룹생성 테스트 입니다",
                            2,
                            "노인",
                            true)
            );
        }

        public static Page<Group> getMultiResultGroups() {
            Group group1 = new Group();
            group1.setGroupId(1L);
            group1.setGroupName("좀나세");
            group1.setGroupImage("example.png");
            group1.setGroupZangId(1L);
            group1.setPlace("서울");
            group1.setContent("그룹 조회 테스트");
            group1.setTag(new Tag("어린이"));

            Group group2 = new Group();
            group2.setGroupId(2L);
            group2.setGroupName("더 좀나세");
            group2.setGroupImage("example.png");
            group2.setGroupZangId(1L);
            group2.setPlace("경기도");
            group2.setContent("그룹 조회 테스트");
            group2.setTag(new Tag("노인"));

            return new PageImpl<>(List.of(group1, group2),
                    PageRequest.of(1,5),1);
        }
    }
}
