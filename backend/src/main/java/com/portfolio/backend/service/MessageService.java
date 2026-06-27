package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Message;
import com.portfolio.backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final EmailService emailService;

    @Transactional
    public Message saveMessage(Message message) {
        Message savedMessage = messageRepository.save(message);
        
        // Dispatch email notification in the background
        new Thread(() -> {
            emailService.sendContactNotification(
                    savedMessage.getName(),
                    savedMessage.getEmail(),
                    savedMessage.getSubject() != null ? savedMessage.getSubject() : "No Subject",
                    savedMessage.getMessage()
            );
        }).start();

        return savedMessage;
    }

    @Transactional(readOnly = true)
    public List<Message> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public Message markAsRead(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        message.setReadStatus(true);
        return messageRepository.save(message);
    }

    @Transactional
    public void deleteMessage(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        messageRepository.delete(message);
    }
}
