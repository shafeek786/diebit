import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  peer!: RTCPeerConnection;
  constructor() {
    console.log("pear connected")
    if (typeof RTCPeerConnection === 'function') {
      console.log("pear connected")
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:global.stun.twilio.com:3478',
          ],
        },
      ],
    });
  } else{
    console.error('RTCPeerConnection is not supported in this browser');
  }
  }

  // Get offer
  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      try {
        console.log("pear check")
        const offer = await this.peer.createOffer();
        console.log("offer: "+ offer)
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      } catch (error) {
        console.error('Create Offer Error:', error);
        return undefined;
      }
    }
    return undefined;
  }

  // Get answer
  async getAnswer(offer: any): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      console.log('Signaling state before setting remote description:', this.peer.signalingState);
      await this.peer.setRemoteDescription(offer);
      console.log('Signaling state after setting remote description:', this.peer.signalingState);
  
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
  
      return ans;
    }
    return undefined;
  }
  

  async setLocalDescription(ans: any) {
    if (this.peer) {
      try {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        console.log('Remote description success');
      } catch (error) {
        console.error('Set Local Description error',error);
      }
    }else{
      console.log("peer connection not available");
    }
  }
}