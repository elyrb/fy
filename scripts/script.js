new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks:[
        {
          name: "Umaga",
          artist: "The Juans",
          cover: "https://raw.github.com/elyrb/fy/main/img/umaga.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/thejuans/01%20Umaga.mp3",
          url: "https://www.youtube.com/channel/UCCtXr8HiqtdeJQLfzn4rUVw",
          favorited: true
        },
        {
          name: "Panaginip",
          artist: "The Juans",
          cover: "https://raw.github.com/elyrb/fy/main/img/1.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/thejuans/02%20Panaginip.mp3",
          url: "https://www.youtube.com/channel/UCCtXr8HiqtdeJQLfzn4rUVw",
          favorited: true
        },
        {
          name: "Hindi Tayo Pwede",
          artist: "The Juans",
          cover: "https://raw.github.com/elyrb/fy/main/img/2.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/thejuans/03%20Hindi%20Tayo%20Pwede.mp3",
          url: "https://www.youtube.com/channel/UCCtXr8HiqtdeJQLfzn4rUVw",
          favorited: true
        },
        {
          name: "Hatid",
          artist: "The Juans",
          cover: "https://raw.github.com/elyrb/fy/main/img/3.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/thejuans/04%20Hatid.mp3",
          url: "https://www.youtube.com/channel/UCCtXr8HiqtdeJQLfzn4rUVw",
          favorited: true
        },
        {
          name: "Itutulog Na Lang",
          artist: "The Juans",
          cover: "https://raw.github.com/elyrb/fy/main/img/4.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/thejuans/05%20Itutulog%20Na%20Lang.mp3",
          url: "https://www.youtube.com/channel/UCCtXr8HiqtdeJQLfzn4rUVw",
          favorited: true
        },
        {
          name: "Lumalapit",
          artist: "The Juans",
          cover: "https://raw.github.com/elyrb/fy/main/img/5.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/thejuans/06%20Lumalapit.mp3",
          url: "https://www.youtube.com/channel/UCCtXr8HiqtdeJQLfzn4rUVw",
          favorited: true
        },
        {
          name: "Limasawa Street",
          artist: "Ben&Ben,
          cover: "https://raw.github.com/elyrb/fy/main/img/limasawastreet.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/ben&ben/01%20Limasawa%20Street%20(Steve%20Lillywhite%20Mix).mp3",
          url: "",
          favorited: true
          
        },
        {
          name: "Limasawa Street",
          artist: "Ben&Ben,
          cover: "https://raw.github.com/elyrb/fy/main/img/limasawastreet.jpg",
          source: "https://raw.github.com/elyrb/fy/main/mp3/ben&ben/01%20Limasawa%20Street%20(Steve%20Lillywhite%20Mix).mp3",
          url: "",
          favorited: true
        }
        
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },

    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
