# Multi-Sig Wallet - Sarthak Kotewale

This project is a simulation of a multi-signature wallet application, built to demonstrate the concepts of shared control and transaction approval. **It does NOT handle real money and should not be used for any financial transactions.** This is a learning project to understand the basic logic of a multi-sig system.

## What is a Multi-Signature Wallet?

A multi-signature (multi-sig) wallet is a type of digital wallet that requires multiple authorized users to approve a transaction before it can be executed. This provides enhanced security compared to a single-signature wallet, as it prevents a single compromised account from draining the wallet.

In a real-world multi-sig wallet:

*   Each authorized user has a private key.
*   Transactions are cryptographically signed by multiple users.
*   A threshold (e.g., 2-of-3, 3-of-5) determines how many signatures are required.

## Key Features

*   **User Authentication:** Users can register and log in using email and password.
*   **Wallet Creation:** Authenticated users can create new wallets, specifying the owners and the required approval threshold.
*   **Transaction Creation:** Wallet owners can create new transaction requests, specifying the recipient, amount, and description.
*   **Transaction Approval/Rejection:** Wallet owners can approve or reject pending transaction requests. A transaction is considered "approved" when the required threshold of approvals is reached.
*   **Transaction List:** Users can view a list of transactions for a specific wallet, showing their status (pending, approved, rejected).


Will add more content along the journey..