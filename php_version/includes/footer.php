    </main>

    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5>Soccer Hunter</h5>
                    <p><?php echo translate('footer_description', $currentLang); ?></p>
                    <div class="app-badges">
                        <a href="#" class="me-2">
                            <img src="/public/images/google-play-badge.png" alt="Google Play" height="40">
                        </a>
                        <a href="#">
                            <img src="/public/images/app-store-badge.png" alt="App Store" height="40">
                        </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <h5><?php echo translate('quick_links', $currentLang); ?></h5>
                    <ul class="list-unstyled">
                        <li><a href="/" class="text-white"><?php echo translate('home', $currentLang); ?></a></li>
                        <li><a href="/category.php?id=1" class="text-white"><?php echo translate('players', $currentLang); ?></a></li>
                        <li><a href="/category.php?id=2" class="text-white"><?php echo translate('coaches', $currentLang); ?></a></li>
                        <li><a href="/news.php" class="text-white"><?php echo translate('news', $currentLang); ?></a></li>
                        <li><a href="/contact.php" class="text-white"><?php echo translate('contact_us', $currentLang); ?></a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5><?php echo translate('contact_info', $currentLang); ?></h5>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-map-marker-alt me-2"></i> <?php echo translate('address', $currentLang); ?></li>
                        <li><i class="fas fa-phone me-2"></i> +1234567890</li>
                        <li><i class="fas fa-envelope me-2"></i> info@soccerhunter.com</li>
                    </ul>
                    <div class="social-links mt-3">
                        <a href="#" class="text-white me-2"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-white me-2"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-white me-2"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-white"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <p class="mb-0">&copy; <?php echo date('Y'); ?> Soccer Hunter. <?php echo translate('all_rights_reserved', $currentLang); ?></p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="/public/js/main.js"></script>
</body>
</html>