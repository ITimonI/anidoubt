<script>
  export let animal;

  const animalTag = animal.group.toLowerCase() + animal.group_number;
  const groupClass = 'group-' + animal.group.toLowerCase();
</script>

<div class="card">
  <div class="card-header">
      <div class="card-number {groupClass}">{animalTag}</div>
      <div class="card-title">
          <p class="card-title-text">{animal.name}</p>
      </div>
  </div>
  <img class="card-image" src="images/quartet-images/{animalTag}.jpg" alt="">
  <div class="card-trivia">{animal.trivia_german}</div>
  <!-- <div class="card-stats">
      <div class="card-stat">
          <div>
              <img src="images/icons/age.svg" alt="">
          </div>
          <div>{animal.max_age}</div>
      </div>
      <div class="card-stat">
          <div>
              <img src="images/icons/weight.svg" alt="">
          </div>
          <div>{animal.max_weight}</div>
      </div>
      <div class="card-stat">
          <div>
              <img src="images/icons/babies.svg" alt="">
          </div>
          <div>{animal.litter_size}</div>
      </div>
      <div class="card-stat">
          <div>
              <img src="images/icons/death.svg" alt="">
          </div>
          <div>{animal.deaths}</div>
      </div>
      <div class="card-stat">
          <div>
              <img src="images/icons/length.svg" alt="">
          </div>
          <div>{animal.max_length}</div>
      </div>
      <div class="card-stat">
          <div>
              <img src="images/icons/speed.svg" alt="">
          </div>
          <div>{animal.top_speed}</div>
      </div>
  </div> -->
</div>