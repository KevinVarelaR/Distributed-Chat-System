<template>
    <div>
        <h1 class="help-menu-title">Twixt for browser</h1>
        <p class="help-menu-description ml-2">Version 0.1</p>
        <div class="flex justify-center w-full">
            <UDivider type="solid" size="sm" class="w-full" />
        </div>
        <h1 class="help-menu-title">About Twixt</h1>
        <p class="help-menu-description ml-2">
            Twixt is a free messaging app that allows you to chat with your friends
            and family. You can send messages, photos, videos, and more.
        </p>

        <div class="flex justify-center w-full">
            <UDivider type="solid" size="sm" class="w-full" />
        </div>

        <h1 class="help-menu-title">Credits</h1>

        <p class="help-menu-description ml-2">
            Twixt was created by Kevin Varela, Anthony Jiménez and Fabián Rojas.
        </p>
        <div class="flex justify-center w-full">
            <UDivider type="solid" size="sm" class="w-full" />
        </div>
        <h1 class="help-menu-title">Contact us</h1>
        <p class="help-menu-description ml-2">
            We'd like to know your thoughts about this app.
        </p>
        <p>
            <a href="mailto:fabianrojasugalde@gmail.com" class="contact-link ml-2"> Contact Fabián Rojas</a>
        </p>
        <p>
            <a href="mailto:kevin03varela@gmail.com" class="contact-link ml-2">
                Contact Kevin Varela</a>
        </p>
        <p>
            <a href="mailto:noni45100@hotmail.com" class="contact-link ml-2">
                Contact Anthony Jiménez</a>
        </p>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped>
div {
    padding: 20px;
}

.menu-title {
    font-size: 20px;
    font-weight: 600;
    color: #000000;
}

.help-menu-description {
    font-size: 14px;
    color: #000000;
    line-height: 1.4;
}

.help-menu-title {
    font-size: 18px;
    font-weight: 600;
    color: #000000;
}

.contact-link {
    color: #1f77b4;
    text-decoration: none;
    margin-bottom: 15px;
}

.contact-link:hover {
    text-decoration: underline;
}
</style>