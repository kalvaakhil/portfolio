package com.portfolio.backend.controller;

import com.portfolio.backend.dto.MessageRequest;
import com.portfolio.backend.model.Message;
import com.portfolio.backend.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private static final Logger log = LoggerFactory.getLogger(MessageController.class);

    private final MessageService messageService;

    @PostMapping("/api/contact")
    public ResponseEntity<Message> submitMessage(@Valid @RequestBody MessageRequest request) {
        log.info("POST /api/contact — new contact message from: {} <{}>", request.getName(), request.getEmail());
        Message message = Message.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();
        Message saved = messageService.saveMessage(message);
        log.info("POST /api/contact — message saved with id={}", saved.getId());
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/api/admin/messages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Message>> getAllMessages() {
        log.debug("GET /api/admin/messages — fetching all messages");
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    @PutMapping("/api/admin/messages/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Message> markAsRead(@PathVariable Long id) {
        log.info("PUT /api/admin/messages/{}/read", id);
        return ResponseEntity.ok(messageService.markAsRead(id));
    }

    @DeleteMapping("/api/admin/messages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        log.info("DELETE /api/admin/messages/{}", id);
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}
