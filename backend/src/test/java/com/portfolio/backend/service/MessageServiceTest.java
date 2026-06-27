package com.portfolio.backend.service;

import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Message;
import com.portfolio.backend.repository.MessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MessageServiceTest {

    @Mock
    private MessageRepository messageRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private MessageService messageService;

    private Message sampleMessage;

    @BeforeEach
    void setUp() {
        sampleMessage = Message.builder()
                .id(1L)
                .name("Jane Sponsor")
                .email("jane@sponsor.com")
                .subject("System design opportunity")
                .message("Hello Akhil, I saw your microservices...")
                .readStatus(false)
                .build();
    }

    @Test
    void testSaveMessage_Success_DispatchesAsyncEmail() {
        when(messageRepository.save(any(Message.class))).thenReturn(sampleMessage);
        doNothing().when(emailService).sendContactNotification(any(), any(), any(), any());

        Message result = messageService.saveMessage(sampleMessage);

        assertNotNull(result);
        assertEquals("Jane Sponsor", result.getName());
        
        // Verify Repository save
        verify(messageRepository, times(1)).save(sampleMessage);
        
        // Verify Asynchronous Email Service dispatch with 1-second timeout
        verify(emailService, timeout(1000).times(1)).sendContactNotification(
                eq("Jane Sponsor"),
                eq("jane@sponsor.com"),
                eq("System design opportunity"),
                eq("Hello Akhil, I saw your microservices...")
        );
    }

    @Test
    void testGetAllMessages_Success() {
        when(messageRepository.findAllByOrderByCreatedAtDesc()).thenReturn(Arrays.asList(sampleMessage));

        List<Message> result = messageService.getAllMessages();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Jane Sponsor", result.get(0).getName());
    }

    @Test
    void testMarkAsRead_Success() {
        when(messageRepository.findById(1L)).thenReturn(Optional.of(sampleMessage));
        when(messageRepository.save(any(Message.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Message result = messageService.markAsRead(1L);

        assertNotNull(result);
        assertTrue(result.isReadStatus());
        verify(messageRepository, times(1)).save(sampleMessage);
    }

    @Test
    void testMarkAsRead_NotFound_ThrowsException() {
        when(messageRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> messageService.markAsRead(99L));
    }

    @Test
    void testDeleteMessage_Success() {
        when(messageRepository.findById(1L)).thenReturn(Optional.of(sampleMessage));
        doNothing().when(messageRepository).delete(sampleMessage);

        messageService.deleteMessage(1L);

        verify(messageRepository, times(1)).delete(sampleMessage);
    }
}
