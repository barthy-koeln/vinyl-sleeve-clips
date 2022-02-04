<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class TwigClassFilters extends AbstractExtension
{
    public function getFunctions(): array
    {
        return [
            new TwigFunction('buildClassList', [$this, 'buildClassList'], ['needs_context' => true]),
        ];
    }

    public function buildClassList(array $context, string $separator = ' '): string
    {
        $classes = $this->flatten(
            $context['additionalClasses'] ?? null,
            $context['additionalClass'] ?? null,
            $context['class'] ?? null,
            $context['classes'] ?? null,
        );

        return implode($separator, array_filter($classes));
    }

    private function flatten(...$items): array
    {
        $flat = [];
        foreach ($items as $item) {
            if (is_array($item)) {
                $flat = array_merge($flat, $item);
                continue;
            }

            $flat[] = $item;
        }

        return $flat;
    }
}
