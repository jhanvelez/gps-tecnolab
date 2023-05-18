<!DOCTYPE html>
<html class="h-full bg-gray-200">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />

    <link href=" {{ mix('../public/assets/css/nucleo-svg.css') }}" rel="stylesheet">
    <link href=" {{ mix('../public/assets/css/nucleo-icons.css') }}" rel="stylesheet">

    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>

    <link href=" {{ mix('../public/assets/css/soft-ui-dashboard.css?v=1.0.3') }}" rel="stylesheet">

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script src="{{ mix('js/app.js') }}" defer></script>
    
    @routes
</head>
<body class="font-sans antialiased leading-none text-gray-800">

@inertia

</body>
</html>
