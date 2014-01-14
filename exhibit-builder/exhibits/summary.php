<?php echo head(array('title' => metadata('exhibit', 'title'), 'bodyclass'=>'exhibits summary')); ?>
<div class="headBack">
  <?php
    $ur = exhibit_builder_exhibit_uri();
    if (stristr($ur,'butler75')) $imageURL = img("butler4a.jpg");
    if ($imageURL != "")
      echo "<div style='padding:0;margin:0;width:100%;background:url(\"$imageURL\") top right no-repeat'>";
  ?>
  <?php
    $title = metadata('exhibit','title');
    $matches = explode(":",$title,2);
  ?>
  <h1 class="exhHeader"><?php echo $matches[0]; ?>
    <?php
      echo "<br />\n"; //':';
    ?>
    <span style="text-transform:none;font-size:24px"><?php echo $matches[1]; ?></span>
  </h1>
  <?php if ($imageURL) echo "</div>"; ?>
</div><!--end id="headBack" -->
<div id="exhibit-sections">	
  <ul class="exhibit-section-nav">
    <li>
      <?php
        $title = exhibit_builder_link_to_exhibit(get_current_record('exhibit'),
						 "Home",
						 array('class' => 'home_link'));
        echo $title;
      ?>
    </li>
    <?php set_exhibit_pages_for_loop_by_exhibit(); ?>
    <?php foreach (loop('exhibit_page') as $exhibitPage): ?>
      <?php 
        $html = '<li>' . '<a href="' . 
                exhibit_builder_exhibit_uri(get_current_record('exhibit'), $exhibitPage) . '">' . 
                cul_insert_angle_brackets(metadata($exhibitPage, 'title')) . '</a></li>';
        echo $html;
      ?>
    <?php endforeach; ?>
  </ul>
</div><!--end id="exhibit-sections" -->
<div id="info">
  <?php echo $exhibit->description; ?>
  <div id="exhibit-credits">	
    <h3>Credits</h3>
    <p>
      <?php echo html_escape($exhibit->credits); ?>
    </p>
  </div><!--end id="exhibit-credits" -->
  <p style="font-size:11px;text-align:right;font-style:italic">Permalink: <a href="http://www.columbia.edu/library/butler75/">http://www.columbia.edu/library/butler75/</a></p>
</div><!--end id="info" -->
<?php echo foot(); ?>
