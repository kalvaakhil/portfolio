package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Message;
import com.portfolio.backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private static final Logger log = LoggerFactory.getLogger(MessageService.class);

    private final MessageRepository messageRepository;
    private final EmailService emailService;

    @Transactional
    public Message saveMessage(Message message) {
        log.info("Saving new contact message from: {} <{}>", message.getName(), message.getEmail());
        Message savedMessage = messageRepository.save(message);
        log.info("Contact message saved with id={}", savedMessage.getId());

        // Dispatch email notification asynchronously
        log.debug("Dispatching async email notification for message id={}", savedMessage.getId());
        try {
            emailService.sendContactNotification(
                    savedMessage.getName(),
                    savedMessage.getEmail(),
                    savedMessage.getSubject() != null ? savedMessage.getSubject() : "No Subject",
                    savedMessage.getMessage()
            );
        } catch (Exception ex) {
            log.error("Async email notification registration failed for message id={}: {}", savedMessage.getId(), ex.getMessage(), ex);
        }

        return savedMessage;
    }

    @Transactional(readOnly = true)
    public List<Message> getAllMessages() {
        log.debug("Fetching all contact messages");
        List<Message> messages = messageRepository.findAllByOrderByCreatedAtDesc();
        log.debug("Fetched {} contact messages", messages.size());
        return messages;
    }

    @Transactional
    public Message markAsRead(Long id) {
        log.info("Marking message id={} as read", id);
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Message not found with id: {}", id);
                    return new ResourceNotFoundException("Message not found with id: " + id);
                });
        message.setReadStatus(true);
        Message updated = messageRepository.save(message);
        log.info("Message id={} marked as read", id);
        return updated;
    }

    @Transactional
    public void deleteMessage(Long id) {
        log.info("Deleting message id={}", id);
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Message not found with id: {}", id);
                    return new ResourceNotFoundException("Message not found with id: " + id);
                });
        messageRepository.delete(message);
        log.info("Message id={} deleted successfully", id);
    }
}
