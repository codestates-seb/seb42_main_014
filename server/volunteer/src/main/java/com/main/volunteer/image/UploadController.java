package com.main.volunteer.image;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class UploadController {

    private final UploaderService uploaderService;

    @PostMapping
    public String uploadFile(@RequestParam("profile") MultipartFile multipartFile) throws IOException{
        String uploadImageUrl = uploaderService.upload(multipartFile, "profile");

        return uploadImageUrl;
    }

    @DeleteMapping
    public String deleteFile(@RequestParam("fileName") String fileName){
        uploaderService.delete(fileName);
        return "파일 삭제";
    }
}
