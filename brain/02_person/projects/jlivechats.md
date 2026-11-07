---
title: JLiveChats
visibility: public
updated: 2026-10-08
source: seed.js
---

## One line
High-performance client-server Java desktop chat application supporting low-latency multi-room messaging.

## Problem
Understanding low-level socket networking, connection drops, thread synchronization, and real-time message broadcasting without third-party abstraction libraries.

## My role
Backend & Systems Engineer.

## Stack
Java, Java Swing / AWT, TCP/IP Sockets, Multi-threading, AWS EC2.

## Architecture (3 to 6 bullets)
- Multi-threaded TCP Server running on AWS EC2.
- Java Swing graphical client interface.
- Custom binary/text socket protocol over TCP connections.
- Thread pool executing `ClientHandler` runnable instances.

## Hard parts and how I solved them
- **Challenge:** Preventing thread race conditions and socket memory leaks when multiple users disconnect abruptly.
- **Solution:** Implemented graceful socket shutdown hooks and concurrent synchronized collections for active client lists.

## Results / metrics
Achieved sub-1-second message delivery latency across simultaneous remote clients.

## Links
- Live: `N/A (Desktop Application)`
- Repo: `https://github.com/bhola-dev58/JLiveChats`

## Interview talking points (3 bullets)
- Implemented low-level TCP socket networking and custom packet broadcasting in Java.
- Handled multi-client thread safety and concurrent resource locking.
- Deployed headless Java socket server on AWS EC2 cloud instance.

## Weak spots an interviewer may probe
- Plaintext TCP sockets without TLS/SSL encryption.
- Java Swing UI state blocking if socket read/write operations execute on main EDT thread.
