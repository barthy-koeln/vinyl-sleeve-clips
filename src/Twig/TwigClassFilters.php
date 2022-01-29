<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class TwigClassFilters extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('buildClassList', [$this, 'buildClassList'], ['needs_context' => true]),
        ];
    }

    public function buildClassList(array $context, array $classes = [], string $separator = ' '): string
    {
        $classes[] = $context['additionalClasses'] ?? null;
        $classes[] = $context['additionalClass'] ?? null;
        $classes[] = $context['class'] ?? null;
        $classes[] = $context['classes'] ?? null;

        return implode($separator, array_filter($classes));
    }
}
