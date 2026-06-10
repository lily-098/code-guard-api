import torch
import torch.nn as nn

class LSTMAutoencoder(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers=1):
        super(LSTMAutoencoder, self).__init__()
        
        self.encoder = nn.LSTM(
            input_size=input_dim, 
            hidden_size=hidden_dim, 
            num_layers=num_layers, 
            batch_first=True
        )
        
        self.decoder = nn.LSTM(
            input_size=hidden_dim, 
            hidden_size=input_dim, 
            num_layers=num_layers, 
            batch_first=True
        )
        
    def forward(self, x):
        # x shape: (batch_size, seq_len, input_dim)
        
        # Encode
        encoded_output, (hidden, cell) = self.encoder(x)
        # encoded_output shape: (batch_size, seq_len, hidden_dim)
        # We take the last hidden state and repeat it seq_len times
        
        # We need to recreate the sequence
        last_hidden = hidden[-1] # shape: (batch_size, hidden_dim)
        decoder_input = last_hidden.unsqueeze(1).repeat(1, x.size(1), 1) 
        # decoder_input shape: (batch_size, seq_len, hidden_dim)
        
        # Decode
        decoded_output, _ = self.decoder(decoder_input)
        # decoded_output shape: (batch_size, seq_len, input_dim)
        
        return decoded_output
